describe("A suite", function() {
 
	var fake;

	beforeEach(function() {
		fake = new Fake();
	});

 	it("test this fake file", function() {
 		var result = fake.sum(1, 1);
 		
 		expect(result).toBe(2);
	});
});
